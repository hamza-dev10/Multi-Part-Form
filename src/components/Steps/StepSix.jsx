"use client";

export default function StepSix({ formData, onPrev, resetForm }) {
  const formatValue = (value) => {
    if (value instanceof File) {
      return value.name;
    }
    if (Array.isArray(value)) {
      return value.join(", ");
    }
    if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    }
    if (value === null || value === undefined) {
      return "";
    }
    return String(value);
  };

  const renderFormData = () => {
    return Object.entries(formData).map(([key, value]) => {
      if (value === undefined || value === null) return null;

      return (
        <div key={key} className="flex flex-col">
          <span className="text-gray-400 text-sm">
            {key.replace(/([A-Z])/g, " $1").trim()}
          </span>
          <span className="text-white">{formatValue(value)}</span>
        </div>
      );
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted successfully!");
    console.log("Form Data:", formData);
    resetForm();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Review Your Information</h2>

      <div className="space-y-4 bg-gray-700 p-6 rounded-lg">
        {renderFormData()}
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onPrev}
          className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Previous
        </button>
        <button
          onClick={handleSubmit}
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
