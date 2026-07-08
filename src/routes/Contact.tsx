import { useState, type FormEvent } from 'react';
import { CONTACT_EMAIL } from '@/content/2026';
import { DetailHeader } from '@/components/DetailHeader';
import { Icon } from '@/components/Icon';

/**
 * Contact form. Submits to Netlify Forms (form name "contact"), which emails the
 * Summit team. A matching hidden static form lives in index.html so Netlify's
 * build bot detects the form at deploy time — required for a JS-rendered SPA.
 */

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    .join('&');

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', email: '', church: '', message: '' });

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...form }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div>
        <DetailHeader title="Questions" />
        <div className="screen detail-screen">
          <div className="contact-success">
            <div className="contact-success-icon">
              <Icon name="check" size={30} />
            </div>
            <h1 className="detail-title">Thanks!</h1>
            <p className="muted">
              Your question is on its way to the Summit team. We’ll get back to you by email.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <DetailHeader title="Questions" />
      <div className="screen detail-screen">
        <p className="eyebrow">We’re here to help</p>
        <h1 className="detail-title">Ask a Question</h1>
        <p className="muted detail-desc">
          Have a question about Summit? Send it here and the team will reply by email.
        </p>

        <form
          name="contact"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={onSubmit}
          className="contact-form"
        >
          {/* Netlify needs these hidden fields */}
          <input type="hidden" name="form-name" value="contact" />
          <p className="hidden-field">
            <label>
              Don’t fill this out: <input name="bot-field" />
            </label>
          </p>

          <label className="field">
            <span className="field-label">Your name</span>
            <input
              className="field-input"
              type="text"
              name="name"
              required
              value={form.name}
              onChange={set('name')}
              autoComplete="name"
            />
          </label>

          <label className="field">
            <span className="field-label">Email</span>
            <input
              className="field-input"
              type="email"
              name="email"
              required
              value={form.email}
              onChange={set('email')}
              autoComplete="email"
              placeholder="you@example.com"
            />
          </label>

          <label className="field">
            <span className="field-label">Church / organization <span className="faint">(optional)</span></span>
            <input
              className="field-input"
              type="text"
              name="church"
              value={form.church}
              onChange={set('church')}
            />
          </label>

          <label className="field">
            <span className="field-label">Your question</span>
            <textarea
              className="field-input field-textarea"
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={set('message')}
            />
          </label>

          {status === 'error' && (
            <p className="contact-error">
              Something went wrong sending your message. Please email us directly at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
          )}

          <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send Question'}
          </button>

          <p className="faint contact-alt">
            Prefer email? Write us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </form>
      </div>
    </div>
  );
}
