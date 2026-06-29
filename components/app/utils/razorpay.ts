type RazorpayHandlerResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayHandlerResponse) => void;
  modal?: {
    ondismiss?: () => void;
  };
  theme?: { color?: string };
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => { open: () => void };
  }
}

let scriptPromise: Promise<void> | null = null;

export function loadRazorpayScript(): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.resolve();
  }
  if (window.Razorpay) {
    return Promise.resolve();
  }
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Razorpay checkout.'));
      document.body.appendChild(script);
    });
  }
  return scriptPromise;
}

export async function openRazorpayCheckout(options: {
  keyId: string;
  amount: number;
  currency: string;
  orderId: string;
  planName: string;
  onSuccess: (paymentId: string, signature: string) => void;
  onDismiss?: () => void;
}): Promise<void> {
  await loadRazorpayScript();
  if (!window.Razorpay) {
    throw new Error('Razorpay is not available.');
  }
  const razorpay = new window.Razorpay({
    key: options.keyId,
    amount: options.amount,
    currency: options.currency,
    name: 'Hiring Journey',
    description: options.planName,
    order_id: options.orderId,
    handler: (response) => {
      options.onSuccess(response.razorpay_payment_id, response.razorpay_signature);
    },
    modal: {
      ondismiss: options.onDismiss,
    },
    theme: { color: '#2563eb' },
  });
  razorpay.open();
}
