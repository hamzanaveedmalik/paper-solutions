import emailjs from '@emailjs/browser';

// Formspree configuration
const FORMSPREE_QUOTES_ENDPOINT = import.meta.env.VITE_FORMSPREE_QUOTES_ENDPOINT || 'https://formspree.io/f/mrbyelog';
const FORMSPREE_SAMPLES_ENDPOINT = import.meta.env.VITE_FORMSPREE_SAMPLES_ENDPOINT || 'https://formspree.io/f/meorezrv';

// EmailJS configuration (for fallback)
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_forthvale';
const EMAILJS_TEMPLATE_ID_QUOTE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_QUOTE || 'template_quote';
const EMAILJS_TEMPLATE_ID_SAMPLE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_SAMPLE || 'template_sample';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key_here';

export interface QuoteFormData {
  name: string;
  email: string;
  company: string;
  phone?: string;
  products: string[];
  quantity: string;
  timeline: string;
  date?: string;
  country: string;
  incoterm: string;
  branding: string[];
  colorNotes?: string;
  brief?: File | null;
  nda: boolean;
  notes?: string;
  agree: boolean;
  reference: string;
  utms?: Record<string, string>;
}

export interface SampleFormData {
  kit: string;
  leathers: string[];
  colors: string;
  hardware: string[];
  stitching: string;
  logo: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  address1: string;
  address2?: string;
  city: string;
  postcode: string;
  country: string;
  vat?: string;
  eori?: string;
  billingChoice: 'qualify' | 'pay';
  website?: string;
  notes?: string;
  agree: boolean;
  reference: string;
}

export async function sendQuoteEmail(data: QuoteFormData) {
  try {
    // Use Formspree for quote requests
    const formspreeEndpoint = FORMSPREE_QUOTES_ENDPOINT;
    
    // Prepare form data for Formspree
    const formData = new FormData();
    formData.append('_subject', `New Quote Request - ${data.reference}`);
    formData.append('_replyto', data.email);
    formData.append('reference', data.reference);
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('company', data.company);
    formData.append('phone', data.phone || 'Not provided');
    formData.append('products', data.products.join(', '));
    formData.append('quantity', data.quantity);
    formData.append('timeline', data.timeline + (data.date ? ` (Target date: ${data.date})` : ''));
    formData.append('country', data.country);
    formData.append('incoterm', data.incoterm);
    formData.append('branding', data.branding.join(', ') || 'None');
    formData.append('colorNotes', data.colorNotes || 'None specified');
    formData.append('nda', data.nda ? 'Yes' : 'No');
    formData.append('notes', data.notes || 'None');
    formData.append('utms', data.utms ? JSON.stringify(data.utms, null, 2) : 'None');
    
    // Handle file upload if present
    if (data.brief) {
      formData.append('brief', data.brief);
    }
    
    // Send POST request to Formspree
    const response = await fetch(formspreeEndpoint, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      return { success: true, messageId: 'formspree-submission' };
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Form submission failed');
    }
  } catch (error) {
    console.error('Error sending quote request to Formspree:', error);
    
    // Fallback: Create a mailto link if Formspree fails
    const emailContent = `
New Quote Request - ${data.reference}

Contact Information:
- Name: ${data.name}
- Email: ${data.email}
- Company: ${data.company}
- Phone: ${data.phone || 'Not provided'}

Project Details:
- Products: ${data.products.join(', ')}
- Quantity: ${data.quantity} units
- Timeline: ${data.timeline}${data.date ? ` (Target date: ${data.date})` : ''}
- Shipping Country: ${data.country}
- Incoterm: ${data.incoterm}
- Branding: ${data.branding.join(', ') || 'None'}

Additional Information:
- Color/Leather Preferences: ${data.colorNotes || 'None specified'}
- NDA Requested: ${data.nda ? 'Yes' : 'No'}
- Notes: ${data.notes || 'None'}

Reference ID: ${data.reference}
    `.trim();

    const mailtoLink = `mailto:hamzanaveedmalik@gmail.com?subject=New Quote Request - ${data.reference}&body=${encodeURIComponent(emailContent)}`;
    window.open(mailtoLink);
    
    return { success: true, messageId: 'fallback-mailto' };
  }
}

export async function sendSampleEmail(data: SampleFormData) {
  try {
    // Use Formspree for sample requests
    const formspreeEndpoint = FORMSPREE_SAMPLES_ENDPOINT;
    
    // Prepare form data for Formspree
    const formData = new FormData();
    formData.append('_subject', `New Sample Request - ${data.reference}`);
    formData.append('_replyto', data.email);
    formData.append('reference', data.reference);
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('company', data.company);
    formData.append('phone', data.phone || 'Not provided');
    formData.append('kit', data.kit);
    formData.append('leathers', data.leathers.join(', '));
    formData.append('colors', data.colors);
    formData.append('hardware', data.hardware.join(', '));
    formData.append('stitching', data.stitching);
    formData.append('logo', data.logo);
    formData.append('address1', data.address1);
    formData.append('address2', data.address2 || '');
    formData.append('city', data.city);
    formData.append('postcode', data.postcode);
    formData.append('country', data.country);
    formData.append('vat', data.vat || '');
    formData.append('eori', data.eori || '');
    formData.append('billingChoice', data.billingChoice === 'qualify' ? 'Free for qualified businesses' : 'Pay sample fee (£29)');
    formData.append('website', data.website || '');
    formData.append('notes', data.notes || 'None');
    
    // Send POST request to Formspree
    const response = await fetch(formspreeEndpoint, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      return { success: true, messageId: 'formspree-submission' };
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Form submission failed');
    }
  } catch (error) {
    console.error('Error sending sample request to Formspree:', error);
    
    // Fallback: Create a mailto link if Formspree fails
    const emailContent = `
New Sample Request - ${data.reference}

Contact Information:
- Name: ${data.name}
- Email: ${data.email}
- Company: ${data.company}
- Phone: ${data.phone || 'Not provided'}

Sample Details:
- Kit: ${data.kit}
- Leathers: ${data.leathers.join(', ')}
- Colors: ${data.colors}
- Hardware: ${data.hardware.join(', ')}
- Stitching: ${data.stitching}
- Logo: ${data.logo}

Shipping Address:
- Address 1: ${data.address1}
- Address 2: ${data.address2 || 'N/A'}
- City: ${data.city}
- Postcode: ${data.postcode}
- Country: ${data.country}

Business Details:
- VAT: ${data.vat || 'N/A'}
- EORI: ${data.eori || 'N/A'}
- Billing: ${data.billingChoice === 'qualify' ? 'Free for qualified businesses' : 'Pay sample fee (£29)'}
- Website: ${data.website || 'N/A'}

Additional Information:
- Notes: ${data.notes || 'None'}

Reference ID: ${data.reference}
    `.trim();

    const mailtoLink = `mailto:hamzanaveedmalik@gmail.com?subject=New Sample Request - ${data.reference}&body=${encodeURIComponent(emailContent)}`;
    window.open(mailtoLink);
    
    return { success: true, messageId: 'fallback-mailto' };
  }
}
