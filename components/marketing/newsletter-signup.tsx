"use client";

import { useState, type FormEvent } from "react";
import { analytics } from "@/lib/analytics";
import { subscribeNewsletter } from "@/lib/newsletter-api";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const honeypot = new FormData(event.currentTarget).get("website");
    if (typeof honeypot === "string" && honeypot.trim()) {
      setStatus("success");
      setMessage("Thanks for subscribing!");
      setEmail("");
      return;
    }

    setStatus("loading");
    setMessage("");
    try {
      const response = await subscribeNewsletter({ email, source: "footer" });
      analytics.newsletterSubscribe();
      setStatus("success");
      setMessage(response.message);
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to subscribe right now.");
    }
  };

  return (
    <div>
      <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
        Career tips newsletter
      </h3>
      <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
        Weekly job-search insights for India&apos;s market. No spam.
      </p>
      <form onSubmit={onSubmit} className="mt-4 space-y-3">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm dark:bg-gray-900 dark:text-white dark:ring-gray-700"
        />
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 disabled:opacity-60"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
      {message ? (
        <p
          className={`mt-3 text-sm ${
            status === "error" ? "text-red-600 dark:text-red-400" : "text-green-700 dark:text-green-300"
          }`}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
