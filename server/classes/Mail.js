/**
 * Class representing a simple email mail object.
 */
class Mail {
    constructor(recipientEmail) {
        this.recipient = recipientEmail;
    }

    setSubject(subject) {
        this.subject = subject;
    }

    setContent(content) {
        this.content = content;
    }

    getSubject() {
        return this.subject;
    }

    getContent() {
        return this.content;
    }

    getRecipient() {
        return this.recipient;
    }
}

module.exports = Mail;