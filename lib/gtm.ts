export const pageview = (url: string) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "pageview",
      page: url,
    });
};
  
export const event = ({
action,
category,
label,
value,
}: {
action: string;
category: string;
label?: string;
value?: number;
}) => {
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
    event: action,
    category,
    label,
    value,
});
};
