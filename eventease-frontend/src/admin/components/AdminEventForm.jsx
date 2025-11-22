import React, { useState, useEffect } from "react";

export default function AdminEventForm({ initialValues, onSubmit, submitLabel }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    venue: "",
    capacity: 0,
    tags: "[]",
    posterUrl: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (initialValues) {
      setForm({
        title: initialValues.title || "",
        description: initialValues.description || "",
        venue: initialValues.venue || "",
        capacity: initialValues.capacity || 0,
        tags: initialValues.tags || "[]",
        posterUrl: initialValues.posterUrl || "",
      });
    }
  }, [initialValues]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: name === "capacity" ? Number(value) : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await onSubmit(form);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginBottom: "0.75rem" }}>
        <label>Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          style={{ width: "100%" }}
        />
      </div>

      <div style={{ marginBottom: "0.75rem" }}>
        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          style={{ width: "100%", minHeight: "80px" }}
        />
      </div>

      <div style={{ marginBottom: "0.75rem" }}>
        <label>Venue</label>
        <input
          name="venue"
          value={form.venue}
          onChange={handleChange}
          style={{ width: "100%" }}
        />
      </div>

      <div style={{ marginBottom: "0.75rem" }}>
        <label>Capacity</label>
        <input
          type="number"
          name="capacity"
          value={form.capacity}
          onChange={handleChange}
          style={{ width: "100%" }}
        />
      </div>

      <div style={{ marginBottom: "0.75rem" }}>
        <label>Tags (JSON string)</label>
        <input
          name="tags"
          value={form.tags}
          onChange={handleChange}
          style={{ width: "100%" }}
        />
      </div>

      <div style={{ marginBottom: "0.75rem" }}>
        <label>Poster URL</label>
        <input
          name="posterUrl"
          value={form.posterUrl}
          onChange={handleChange}
          style={{ width: "100%" }}
        />
      </div>

      <button type="submit">{submitLabel}</button>
    </form>
  );
}
