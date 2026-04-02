import { useState, useEffect } from 'react';
import { getNotes, createNote, updateNote, deleteNote, getCurrentUser, getSubjects } from '../services/api';
import { generateNotes, getTopics, getAvailableSubjects } from '../services/ai';
import Toast from '../components/Toast';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { motion } from 'framer-motion';
import { BookText, Sparkles, Trash2, Edit3, X, Search, FileEdit } from 'lucide-react';

export default function Notes() {
  const user = getCurrentUser();
  const [notes, setNotes] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showViewer, setShowViewer] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [filterSubject, setFilterSubject] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // AI panel state
  const [aiSubject, setAiSubject] = useState('');
  const [aiTopics, setAiTopics] = useState([]);
  const [aiSelectedTopic, setAiSelectedTopic] = useState('');

  // Note form
  const [form, setForm] = useState({
    title: '',
    content: '',
    subject: '',
    tags: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [notesRes, subRes] = await Promise.allSettled([
        getNotes({ subject: filterSubject, search: searchQuery }),
        getSubjects(),
      ]);
      if (notesRes.status === 'fulfilled') setNotes(notesRes.value.notes || []);
      if (subRes.status === 'fulfilled') setSubjects(subRes.value.subjects || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        getNotes({ subject: filterSubject, search: searchQuery })
          .then(res => setNotes(res.notes || []))
          .catch(console.error);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [filterSubject, searchQuery]);

  const handleSaveNote = async (e) => {
    e.preventDefault();
    try {
      if (selectedNote) {
        const res = await updateNote(selectedNote.id, form);
        setNotes(notes.map(n => n.id === selectedNote.id ? res.note : n));
        setToast({ message: 'Note updated!', type: 'success' });
      } else {
        const res = await createNote(form);
        setNotes([res.note, ...notes]);
        setToast({ message: 'Note saved!', type: 'success' });
      }
      closeForm();
    } catch (err) {
      setToast({ message: err.response?.data?.error || 'Failed to save note', type: 'error' });
    }
  };

  const handleDeleteNote = async (id) => {
    if (!window.confirm('Delete this note?')) return;
    try {
      await deleteNote(id);
      setNotes(notes.filter(n => n.id !== id));
      if (selectedNote?.id === id) {
        setSelectedNote(null);
        setShowViewer(false);
      }
      setToast({ message: 'Note deleted', type: 'info' });
    } catch (err) {
      setToast({ message: 'Failed to delete', type: 'error' });
    }
  };

  // AI Generation
  const handleAISubjectChange = (subject) => {
    setAiSubject(subject);
    const topics = getTopics(subject, user?.level || 'school');
    setAiTopics(topics);
    setAiSelectedTopic('');
  };

  const handleGenerateAINotes = async () => {
    if (!aiSelectedTopic) {
      setToast({ message: 'Please select a topic', type: 'warning' });
      return;
    }
    setAiLoading(true);
    try {
      const aiNote = await generateNotes(aiSelectedTopic, aiSubject, user?.level || 'school', user?.board || '');
      
      // Save to backend
      const res = await createNote({
        ...aiNote,
        is_ai_generated: 1,
      });
      
      setNotes([res.note, ...notes]);
      setToast({ message: '🤖 AI notes generated and saved!', type: 'success' });
      setShowAI(false);
      
      // Open the new note in viewer
      setSelectedNote(res.note);
      setShowViewer(true);
    } catch (err) {
      setToast({ message: 'Failed to generate notes', type: 'error' });
    } finally {
      setAiLoading(false);
    }
  };

  const viewNote = (note) => {
    setSelectedNote(note);
    setShowViewer(true);
  };

  const editNote = (note) => {
    setSelectedNote(note);
    setForm({
      title: note.title,
      content: note.content,
      subject: note.subject || '',
      tags: note.tags || '',
    });
    setShowViewer(false);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedNote(null);
    setForm({ title: '', content: '', subject: '', tags: '' });
  };

  const closeViewer = () => {
    setShowViewer(false);
    setSelectedNote(null);
  };

  const aiSubjects = getAvailableSubjects(user?.level || 'school');

  if (loading) return <div className="flex items-center justify-center h-[60vh]"><LoadingSpinner size="lg" text="Loading notes..." /></div>;

  return (
    <div className="page-enter space-y-6">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-extrabold text-dark-800 font-display flex items-center gap-2">
            <BookText className="w-8 h-8 text-primary-500" /> Notes
          </h1>
          <p className="text-sm font-medium text-dark-500 mt-1">Create notes or use AI to generate rich study materials</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowAI(true)}
            className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-5 py-2.5 rounded-xl 
                     font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 
                     transition-all duration-300 text-sm hover:-translate-y-1"
          >
            <Sparkles className="w-4 h-4" /> AI Generate
          </button>
          <button
            onClick={() => { closeForm(); setShowForm(true); }}
            className="btn-primary flex items-center gap-2 hover:-translate-y-1"
          >
            <FileEdit className="w-4 h-4" /> New Note
          </button>
        </div>
      </motion.div>

      {/* Search & Filter */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10 border-white/60 bg-white/60 backdrop-blur-md shadow-sm"
          />
        </div>
        <select
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
          className="input-field w-auto min-w-[160px]"
        >
          <option value="">All Subjects</option>
          {subjects.map(s => (
            <option key={s.id} value={s.name}>{s.name}</option>
          ))}
        </select>
      </motion.div>

      {/* AI Generation Panel */}
      {showAI && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
             onClick={(e) => e.target === e.currentTarget && setShowAI(false)}>
          <div className="card p-6 w-full max-w-lg animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 
                              flex items-center justify-center">
                  <span className="text-xl">🤖</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-dark-800 font-display">AI Notes Generator</h2>
                  <p className="text-xs text-dark-400">Powered by EDUCERA AI • {user?.level === 'school' ? 'CBSE aligned' : 'College level'}</p>
                </div>
              </div>
              <button onClick={() => setShowAI(false)} className="p-2 hover:bg-dark-50 rounded-lg">✕</button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-600 mb-1.5">Subject</label>
                <div className="relative">
                  <input
                    list="ai-subject-list"
                    type="text"
                    value={aiSubject}
                    onChange={(e) => handleAISubjectChange(e.target.value)}
                    placeholder="Enter subject (e.g. DBMS, Data Structures)"
                    className="input-field text-base"
                  />
                  <datalist id="ai-subject-list">
                    {subjects.map(s => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                    {aiSubjects.map(sub => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </datalist>
                </div>
              </div>

              <div className="animate-fade-in">
                <label className="block text-sm font-medium text-dark-600 mb-1.5">Topic Keywords</label>
                <input
                  list="ai-topic-list"
                  type="text"
                  value={aiSelectedTopic}
                  onChange={(e) => setAiSelectedTopic(e.target.value)}
                  placeholder="Enter keywords (e.g. Normalization, B-Trees)"
                  className="input-field text-base"
                />
                {aiTopics?.length > 0 && (
                  <datalist id="ai-topic-list">
                    {aiTopics.map(topic => (
                      <option key={topic} value={topic}>{topic}</option>
                    ))}
                  </datalist>
                )}
                <p className="text-xs text-dark-400 mt-2 leading-relaxed">
                  Provide keywords or choose a suggested topic. We'll automatically organize video lectures, book PDFs, notes, and previous year questions for you.
                </p>
              </div>

              <button
                onClick={handleGenerateAINotes}
                disabled={!aiSelectedTopic || aiLoading}
                className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all
                  ${aiSelectedTopic && !aiLoading
                    ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:shadow-lg hover:shadow-purple-500/25'
                    : 'bg-dark-200 text-dark-400 cursor-not-allowed'}`}
              >
                {aiLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Generating notes...
                  </>
                ) : (
                  <>🤖 Generate Notes</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Note Viewer Modal (Read-Only with Markdown) */}
      {showViewer && selectedNote && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
             onClick={(e) => e.target === e.currentTarget && closeViewer()}>
          <div className="card p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 flex-wrap">
                {selectedNote.is_ai_generated === '1' && (
                  <span className="badge bg-violet-100 text-violet-700 text-xs">🤖 AI Generated</span>
                )}
                {selectedNote.subject && (
                  <span className="badge-primary text-xs">{selectedNote.subject}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => editNote(selectedNote)}
                  className="p-2 hover:bg-primary-50 rounded-lg text-dark-400 hover:text-primary-500 transition-colors"
                  title="Edit"
                >
                  ✏️
                </button>
                <button onClick={closeViewer} className="p-2 hover:bg-dark-50 rounded-lg text-dark-400">✕</button>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-dark-800 font-display mb-1">
              {selectedNote.title}
            </h2>

            {selectedNote.tags && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {selectedNote.tags.split(',').map((tag, j) => (
                  <span key={j} className="text-[10px] bg-dark-50 text-dark-400 px-2 py-0.5 rounded-md">
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}

            <div className="border-t border-dark-100 pt-4 mt-2">
              <MarkdownRenderer content={selectedNote.content} />
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-dark-100">
              <p className="text-[10px] text-dark-300">
                {selectedNote.is_ai_generated === '1' ? '🤖 AI Generated • ' : ''}
                Last updated: {new Date(selectedNote.updated_at || selectedNote.created_at).toLocaleDateString('en-IN', {
                  day: 'numeric', month: 'long', year: 'numeric'
                })}
              </p>
              <button
                onClick={() => editNote(selectedNote)}
                className="text-sm text-primary-500 font-semibold hover:text-primary-600"
              >
                Edit Note →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Note Editor Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
             onClick={(e) => e.target === e.currentTarget && closeForm()}>
          <div className="card p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-dark-800 font-display">
                {selectedNote ? '✏️ Edit Note' : '📝 New Note'}
              </h2>
              <button onClick={closeForm} className="p-2 hover:bg-dark-50 rounded-lg">✕</button>
            </div>

            <form onSubmit={handleSaveNote} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-600 mb-1.5">Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Note title..."
                  className="input-field text-lg font-semibold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-600 mb-1.5 flex justify-between">
                    <span>Subject</span>
                    <a href="/profile" className="text-xs text-primary-500 hover:underline">Manage</a>
                  </label>
                  <div className="relative">
                    <input
                      list="subject-list"
                      name="subject"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="Type or select subject"
                      className="input-field"
                    />
                    <datalist id="subject-list">
                      {subjects.map(s => (
                        <option key={s.id} value={s.name}>{s.name}</option>
                      ))}
                    </datalist>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-600 mb-1.5">Tags</label>
                  <input
                    type="text"
                    value={form.tags}
                    onChange={(e) => setForm({ ...form, tags: e.target.value })}
                    placeholder="Comma-separated tags"
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-600 mb-1.5">Content *</label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="Write your notes here... (Supports markdown)"
                  className="input-field min-h-[300px] font-mono text-sm leading-relaxed resize-none"
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeForm} className="btn-secondary flex-1">Cancel</button>
                <button type="submit" className="btn-primary flex-1">
                  {selectedNote ? 'Update Note' : 'Save Note'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notes Grid */}
      {notes.length === 0 ? (
        <EmptyState
          icon="📝"
          title="No notes yet"
          message={`Start creating your study notes or use AI to generate ${user?.level === 'school' ? 'CBSE-aligned ' : ''}content.`}
          action="Create Your First Note"
          onAction={() => { closeForm(); setShowForm(true); }}
        />
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {notes.map((note, i) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => viewNote(note)}
              className="card-glass p-6 cursor-pointer group hover-lift border border-white/60"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  {note.is_ai_generated === '1' && (
                    <span className="badge bg-violet-100 text-violet-700 text-[10px] flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> AI
                    </span>
                  )}
                  {note.subject && (
                    <span className="badge-primary text-[10px] shadow-sm">{note.subject}</span>
                  )}
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDeleteNote(note.id); }}
                  className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-50 text-dark-400 hover:text-red-500 transition-all duration-300"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <h3 className="font-semibold text-dark-800 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                {note.title}
              </h3>
              
              <p className="text-sm text-dark-400 line-clamp-3 leading-relaxed">
                {note.content?.replace(/#/g, '').replace(/\*/g, '').replace(/\|/g, ' ').substring(0, 150)}...
              </p>

              {note.tags && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {note.tags.split(',').slice(0, 3).map((tag, j) => (
                    <span key={j} className="text-[10px] bg-dark-50 text-dark-400 px-2 py-0.5 rounded-md">
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between mt-3">
                <p className="text-[10px] text-dark-300">
                  {new Date(note.updated_at || note.created_at).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'short', year: 'numeric'
                  })}
                </p>
                <span className="text-xs text-primary-500 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Read →
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
