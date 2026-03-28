/**
 * PORTFOLIO CONTACT FORM - EMAIL ONLY VERSION
 * 
 * INSTRUCTIONS:
 * 1. Copy this entire code
 * 2. Go to https://script.google.com/
 * 3. Open your existing project or create new one
 * 4. Delete all existing code
 * 5. Paste this code
 * 6. Click Save (💾)
 * 7. Click Deploy → Manage deployments → Edit (pencil icon)
 * 8. Select "New version" and click Deploy
 * 9. Authorize (only needs email permission)
 * 10. Copy the new Web app URL
 * 11. Update the action URL in your HTML form
 * 
 * PERMISSIONS NEEDED: Only "Send email as you"
 */

function doPost(e) {
  try {
    // Get form data
    var name = e.parameter.name || 'No name provided';
    var email = e.parameter.email || 'No email provided';
    var message = e.parameter.message || 'No message provided';
    var timestamp = new Date();
    
    // Send email notification to you
    var emailTo = 'avinashsinghaniya1048@gmail.com';
    var subject = '📧 New Contact Form Message from ' + name;
    var body = 'You have received a new message from your portfolio contact form:\n\n' +
               '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
               '👤 Name: ' + name + '\n' +
               '📧 Email: ' + email + '\n\n' +
               '💬 Message:\n' + message + '\n\n' +
               '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
               '🕐 Submitted: ' + timestamp.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + '\n\n' +
               'Reply directly to: ' + email;
    
    MailApp.sendEmail(emailTo, subject, body, {
      replyTo: email
    });
    
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success',
      'message': 'Thank you! Your message has been sent successfully.'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
