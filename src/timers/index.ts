import { fetchInvoices } from "./load-invoices";

export function timers() {
    setTimeout(fetchInvoices, 15000);
}