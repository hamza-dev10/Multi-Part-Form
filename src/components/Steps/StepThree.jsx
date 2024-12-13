"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    jobTitle: yup.string().required("Job title is required"),
    employmentStatus: yup.string().required("Employment status is required"),
    companyName: yup.string().when("employmentStatus", {
      is: "Employed",
      then: () => yup.string().required("Company name is required"),
      otherwise: () => yup.string(),
    }),
    yearsOfExperience: yup.number().required("Years of experience is required"),
    resume: yup.mixed().required("Resume is required"),
  })
  .required();

export default function StepThree({
  onNext,
  onPrev,
  updateFormData,
  formData,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formData,
  });

  const employmentStatus = watch("employmentStatus");

  const onSubmit = (data) => {
    updateFormData(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <input
          {...register("jobTitle")}
          placeholder="Current Job Title"
          className="w-full p-3 bg-gray-700 rounded-lg"
        />
        {errors.jobTitle && (
          <p className="text-red-500 mt-1">{errors.jobTitle.message}</p>
        )}
      </div>

      <div>
        <select
          {...register("employmentStatus")}
          className="w-full p-3 bg-gray-700 rounded-lg"
        >
          <option value="">Select Employment Status</option>
          <option value="Employed">Employed</option>
          <option value="Unemployed">Unemployed</option>
          <option value="Student">Student</option>
          <option value="Self-Employed">Self-Employed</option>
        </select>
        {errors.employmentStatus && (
          <p className="text-red-500 mt-1">{errors.employmentStatus.message}</p>
        )}
      </div>

      {employmentStatus === "Employed" && (
        <div>
          <input
            {...register("companyName")}
            placeholder="Company Name"
            className="w-full p-3 bg-gray-700 rounded-lg"
          />
          {errors.companyName && (
            <p className="text-red-500 mt-1">{errors.companyName.message}</p>
          )}
        </div>
      )}

      <div>
        <input
          {...register("yearsOfExperience")}
          type="number"
          min="0"
          onKeyDown={(e) => {
            if (e.key === "-" || e.key === "e") {
              e.preventDefault();
            }
          }}
          placeholder="Years of Experience"
          className="w-full p-3 bg-gray-700 rounded-lg"
        />
        {errors.yearsOfExperience && (
          <p className="text-red-500 mt-1">
            {errors.yearsOfExperience.message}
          </p>
        )}
      </div>

      <div>
        <input
          {...register("resume")}
          type="file"
          className="w-full p-3 bg-gray-700 rounded-lg"
        />
        {errors.resume && (
          <p className="text-red-500 mt-1">{errors.resume.message}</p>
        )}
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
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Next
        </button>
      </div>
    </form>
  );
}
