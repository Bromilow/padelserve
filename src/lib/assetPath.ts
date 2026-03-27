const base = process.env.NODE_ENV === "production" ? "/padelserve" : "";
export const asset = (path: string) => `${base}${path}`;
