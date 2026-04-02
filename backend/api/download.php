<?php
// EDUCERA Material Download Generator
header('Access-Control-Allow-Origin: *');

$subject = $_GET['subject'] ?? 'Subject';
$topic = $_GET['topic'] ?? 'Topic';
$type = $_GET['type'] ?? 'Material';

// Ensure safe filename
$filename = preg_replace('/[^a-zA-Z0-9_-]/', '_', "{$subject}_{$topic}_{$type}");
$filename .= '.pdf';

// Output a minimal valid PDF
$pdfContent = <<<PDF
%PDF-1.4
1 0 obj <</Type /Catalog /Pages 2 0 R>> endobj
2 0 obj <</Type /Pages /Kids [3 0 R] /Count 1>> endobj
3 0 obj <</Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources <</Font <</F1 5 0 R>>>>>> endobj
4 0 obj <</Length 200>> stream
BT /F1 24 Tf 50 700 Td (EDUCERA Study Material) Tj
/F1 16 Tf 0 -40 Td (Subject: $subject) Tj
/F1 14 Tf 0 -30 Td (Topic: $topic) Tj
/F1 12 Tf 0 -30 Td (Type: $type) Tj
/F1 10 Tf 0 -50 Td (This is an AI-curated study material placeholder.) Tj
/F1 10 Tf 0 -20 Td (In a production environment, this would serve the actual comprehensive PDF.) Tj ET
endstream endobj
5 0 obj <</Type /Font /Subtype /Type1 /BaseFont /Helvetica>> endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000056 00000 n 
0000000111 00000 n 
0000000213 00000 n 
0000000508 00000 n 
trailer <</Size 6 /Root 1 0 R>>
startxref
596
%%EOF
PDF;

header('Content-Type: application/pdf');
header('Content-Disposition: attachment; filename="' . $filename . '"');
header('Content-Length: ' . strlen($pdfContent));
header('Cache-Control: private, max-age=0, must-revalidate');
header('Pragma: public');

echo $pdfContent;
exit;
