"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    monthlyIncome: yup
      .number()
      .min(0, "Monthly income cannot be negative")
      .required("Monthly income is required"),
    loanStatus: yup.string().required("Loan status is required"),
    loanAmount: yup.number().when("loanStatus", {
      is: "Yes",
      then: () =>
        yup
          .number()
          .min(0, "Loan amount cannot be negative")
          .required("Loan amount is required"),
      otherwise: () => yup.number().min(0),
    }),
    creditScore: yup
      .number()
      .min(300, "Credit score must be between 300 and 850")
      .max(850, "Credit score must be between 300 and 850")
      .required("Credit score is required"),
  })
  .required();

export default function StepFour({ onNext, onPrev, updateFormData, formData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formData,
  });

  const loanStatus = watch("loanStatus");

  const onSubmit = (data) => {
    updateFormData(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-gray-300 mb-2">
          Monthly Income <span className="text-red-500">*</span>
        </label>
        <input
          {...register("monthlyIncome")}
          type="number"
          min="0"
          placeholder="Enter your monthly income"
          onKeyDown={(e) => {
            if (e.key === "-" || e.key === "e") {
              e.preventDefault();
            }
          }}
          className="w-full p-3 bg-gray-700 rounded-lg"
        />
        {errors.monthlyIncome && (
          <p className="text-red-500 mt-1">{errors.monthlyIncome.message}</p>
        )}
      </div>

      <div>
        <label className="block text-gray-300 mb-2">
          Loan Status <span className="text-red-500">*</span>
        </label>
        <select
          {...register("loanStatus")}
          className="w-full p-3 bg-gray-700 rounded-lg"
        >
          <option value="">Do you have any existing loans?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {errors.loanStatus && (
          <p className="text-red-500 mt-1">{errors.loanStatus.message}</p>
        )}
      </div>

      {loanStatus === "Yes" && (
        <div>
          <label className="block text-gray-300 mb-2">
            Loan Amount <span className="text-red-500">*</span>
          </label>
          <input
            {...register("loanAmount")}
            type="number"
            min="0"
            placeholder="Enter your loan amount"
            onKeyDown={(e) => {
              if (e.key === "-" || e.key === "e") {
                e.preventDefault();
              }
            }}
            className="w-full p-3 bg-gray-700 rounded-lg"
          />
          {errors.loanAmount && (
            <p className="text-red-500 mt-1">{errors.loanAmount.message}</p>
          )}
        </div>
      )}

      <div>
        <label className="block text-gray-300 mb-2">
          Credit Score <span className="text-red-500">*</span>
        </label>
        <input
          {...register("creditScore")}
          type="number"
          min="300"
          max="850"
          placeholder="Enter your credit score (300-850)"
          onKeyDown={(e) => {
            if (e.key === "-" || e.key === "e") {
              e.preventDefault();
            }
          }}
          className="w-full p-3 bg-gray-700 rounded-lg"
        />
        {errors.creditScore && (
          <p className="text-red-500 mt-1">{errors.creditScore.message}</p>
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
