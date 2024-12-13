"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    fullName: yup.string().required("Full name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
    gender: yup.string().required("Gender is required"),
    dateOfBirth: yup.string().required("Date of birth is required"),
  })
  .required();

export default function StepOne({ onNext, updateFormData, formData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formData,
  });

  const onSubmit = (data) => {
    updateFormData(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <input
          {...register("fullName")}
          placeholder="Full Name"
          className="w-full p-3 bg-gray-700 rounded-lg"
        />
        {errors.fullName && (
          <p className="text-red-500 mt-1">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="w-full p-3 bg-gray-700 rounded-lg"
        />
        {errors.email && (
          <p className="text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full p-3 bg-gray-700 rounded-lg"
        />
        {errors.password && (
          <p className="text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("confirmPassword")}
          type="password"
          placeholder="Confirm Password"
          className="w-full p-3 bg-gray-700 rounded-lg"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 mt-1">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-gray-300">Gender</label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              {...register("gender")}
              type="radio"
              value="Male"
              className="mr-2"
            />
            Male
          </label>
          <label className="flex items-center">
            <input
              {...register("gender")}
              type="radio"
              value="Female"
              className="mr-2"
            />
            Female
          </label>
          <label className="flex items-center">
            <input
              {...register("gender")}
              type="radio"
              value="Other"
              className="mr-2"
            />
            Other
          </label>
        </div>
        {errors.gender && (
          <p className="text-red-500 mt-1">{errors.gender.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("dateOfBirth")}
          type="date"
          className="w-full p-3 bg-gray-700 rounded-lg"
        />
        {errors.dateOfBirth && (
          <p className="text-red-500 mt-1">{errors.dateOfBirth.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
      >
        Next
      </button>
    </form>
  );
}
