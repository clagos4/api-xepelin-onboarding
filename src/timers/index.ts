import { fetchInvoices } from "./load-invoices";

export function timers() {
    fetchInvoices();
    setTimeout(fetchInvoices, 1000 * 60 * 60 * 24);
}