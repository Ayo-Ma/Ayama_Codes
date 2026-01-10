import { useMemo, useState } from "react";

export default function Form() {
  const FORMSPREE_ENDPOINT = useMemo(
    () =>
      import.meta.env.VITE_FORMSPREE_ENDPOINT ||
      "https://formspree.io/f/xbdlnwre",
    []
  );

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    message: "",
  });

  const [status, setStatus] = useState({ state: "idle", msg: "" });

  const disabled = status.state === "sending";

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.firstName.trim() || !form.lastName.trim() || !form.message.trim()) {
      setStatus({ state: "error", msg: "Please fill in all fields." });
      return;
    }

    if (!FORMSPREE_ENDPOINT) {
      const subject = encodeURIComponent(
        `Portfolio message from ${form.firstName} ${form.lastName}`
      );
      const body = encodeURIComponent(form.message);
      window.location.href = `mailto:abdulmalikasimiyu@gmail.com?subject=${subject}&body=${body}`;
      return;
    }

    try {
      setStatus({ state: "sending", msg: "" });

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          message: form.message,
          _subject: `Portfolio message from ${form.firstName} ${form.lastName}`,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Failed to send message.");

      setStatus({ state: "success", msg: "Message sent successfully." });
      setForm({ firstName: "", lastName: "", message: "" });
    } catch (err) {
      setStatus({
        state: "error",
        msg: err?.message || "Something went wrong. Try again.",
      });
    }
  }

  return (
    <div className="w-full bg-white">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        <h3 className="text-3xl sm:text-4xl font-bold text-[#3d3d3d]">
          Reach Out
        </h3>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="Full name"
              disabled={disabled}
              className="
                h-11 w-full rounded-xl
                bg-[#f2f2f2] px-4
                text-[16px] text-[#5b5b5b]
                border border-[#c7c5c5]
                outline-none
                focus:border-blue-500
                transition
              "
            />

            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last name"
              disabled={disabled}
              className="
                h-11 w-full rounded-xl
                bg-[#f2f2f2] px-4
                text-[16px] text-[#5b5b5b]
                border border-[#c7c5c5]
                outline-none
                focus:border-blue-500
                transition
              "
            />
          </div>

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Message"
            disabled={disabled}
            className="
              min-h-35 w-full rounded-xl
              bg-[#f2f2f2] px-4 py-3
              text-[16px] text-[#5b5b5b]
              border border-[#c7c5c5]
              outline-none resize-none
              focus:border-blue-500
              transition
            "
          />

          {status.state !== "idle" && (
            <div
              className={[
                "w-full rounded-xl px-4 py-3 text-sm border",
                status.state === "success"
                  ? "bg-green-50 text-green-800 border-green-200"
                  : status.state === "error"
                  ? "bg-red-50 text-red-800 border-red-200"
                  : "bg-zinc-50 text-zinc-700 border-zinc-200",
              ].join(" ")}
            >
              {status.state === "sending" ? "Sending..." : status.msg}
            </div>
          )}

          <button
            type="submit"
            disabled={disabled}
            className="
              h-11 w-full rounded-xl bg-blue-500
              text-white text-[16px] font-semibold
              transition cursor-pointer
              hover:scale-[1.01] active:scale-[0.98]
              disabled:opacity-60 disabled:hover:scale-100
            "
          >
            {disabled ? "Sending..." : "Send Message"}
          </button>
        </form>

        <div className="mt-10 border-t border-[#D8D8D8] pt-6 text-center text-[#6e6e6e] text-sm sm:text-base">
          Copyright @ 2026 Ayama Codes
        </div>
      </div>
    </div>
  );
}
