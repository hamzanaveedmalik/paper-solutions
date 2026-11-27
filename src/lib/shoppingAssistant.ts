import { getProducts } from '@/data/catalogue';
import { siteConfig } from '@/config/site';
import type { CatalogueProduct } from '@/data/types';

export type AssistantReply = { text: string; products?: CatalogueProduct[]; action?: 'order' | 'checkout' | 'contact' };
const stop = new Set('i me my we our you your a an the some please find show need want looking for have do does can could would like buy order get sell pack packs case cases of and to in with what which size sizes options available products product packaging supplies supply'.split(' '));
function stem(word: string): string {
  if (word === 'boxes') return 'box';
  return word.length > 3 ? word.replace(/s$/, '') : word;
}
function terms(text: string): string[] {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, ' ').split(' ').filter(Boolean).map(stem);
}
const aliases: Record<string, string[]> = {
  coffee: ['coffee', 'cup'], takeaway: ['takeaway', 'container', 'box'],
  eco: ['bagasse', 'kraft', 'wood', 'paper'], aluminum: ['aluminium', 'foil'],
  aluminium: ['aluminium', 'foil'], serviette: ['napkin'],
};
export function findAssistantProducts(query: string): CatalogueProduct[] {
  const cleaned = query.replace(/\b\d+\s*(?:cases?|packs?)\b/gi, '');
  const needles = [...new Set(terms(cleaned).filter(t => !stop.has(t)))];
  if (!needles.length) return [];
  return getProducts().map(product => {
    const title = terms(`${product.name} ${product.sku || ''} ${product.capacity || ''} ${product.material || ''} ${product.colour || ''}`);
    const detail = terms(`${product.descriptionText || ''} ${product.variants.map(v => `${v.label} ${v.sku || ''}`).join(' ')} ${product.categorySlugs.join(' ')} ${product.packQuantity || ''}`);
    let score = 0;
    for (const token of needles) {
      const variants = aliases[token] || [token];
      const titleHit = variants.some(v => title.includes(v));
      const detailHit = variants.some(v => detail.includes(v));
      if (!titleHit && !detailHit) return { product, score: 0 };
      score += titleHit ? 4 : 1;
    }
    return { product, score };
  }).filter(p => p.score > 0).sort((a, b) => b.score - a.score || a.product.name.localeCompare(b.product.name)).slice(0, 4).map(p => p.product);
}
export function suggestedPackQuantity(query: string): number {
  const match = query.match(/\b(\d+)\s*(?:cases?|packs?)\b/i);
  return match ? Math.min(9999, Math.max(1, Number(match[1]))) : 1;
}
export function answerCustomer(message: string): AssistantReply {
  const q = message.trim().toLowerCase();
  if (/\b(stock|availability|in stock)\b/.test(q)) return { text: 'Live stock is not connected. You can build a basket, and our team will confirm availability before accepting your order.', action: 'order' };
  if (/\b(deliver|delivery|shipping|postage|arrive|tomorrow)\b/.test(q) && !/\b(bag|bags)\b/.test(q)) return { text: 'Delivery charges, areas and dates need confirmation from our team. Add your delivery postcode and preferred date to your order request; we cannot promise a delivery date here.', action: 'order' };
  if (/\b(pay|payment|checkout|card|stripe)\b/.test(q)) return { text: 'Online payments are not available yet. You can review the checkout page or send an order request for our team to confirm. Please do not enter card details into this chat.', action: 'checkout' };
  if (/\b(vat|tax|discount|cheaper|wholesale price)\b/.test(q)) return { text: 'Catalogue prices are guides. Our team will confirm final prices, VAT, delivery and any bulk pricing in your quote. No discount or payable total is promised by this assistant.', action: 'order' };
  if (/\b(contact|human|person|email|phone|hours|open|address|refund|return|cancel|track|complaint)\b/.test(q)) return { text: `For order updates, changes, returns or other help, contact ${siteConfig.email}. ${siteConfig.hours.weekdays}. Address: ${siteConfig.address.line1}, ${siteConfig.address.city}, ${siteConfig.address.postcode}.`, action: 'contact' };
  if (/^(hi|hello|hey|help)[!. ]*$/.test(q)) return { text: 'Hello! Tell me what you need, such as “brown paper bags” or “2 cases of burger boxes”. I can find catalogue products and help you prepare an order request.' };
  if (/\b(book|place|submit|confirm|finish)\b.*\border\b|^order$|\bbasket\b/.test(q)) return { text: 'Review your basket, check quantities and add your contact and delivery details. You will approve the request yourself. Your order is only confirmed when our team accepts it.', action: 'order' };
  const products = findAssistantProducts(q);
  if (products.length) return { text: 'Here are the closest catalogue matches. Choose the exact option and number of packs or cases before adding. Prices are guides; stock and delivery will be confirmed by our team.', products };
  return { text: 'I could not match that to the catalogue. Try a product name, material or size, such as “12oz cups”, “kraft bowls” or “paper bags”. For other questions, our team can help.', action: 'contact' };
}
