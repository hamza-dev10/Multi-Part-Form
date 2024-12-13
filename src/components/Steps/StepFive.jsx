"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    preferredContact: yup
      .string()
      .required("Preferred contact method is required"),
    hobbies: yup.array().min(1, "Select at least one hobby"),
    newsletter: yup.boolean(),
  })
  .required();

const hobbies = [
  "Sports",
  "Music",
  "Reading",
  "Gaming",
  "Cooking",
  "Travel",
  "Photography",
  "Art",
];

export default function StepFive({ onNext, onPrev, updateFormData, formData }) {
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
      <div className="space-y-2">
        <label className="block text-gray-300">Preferred Mode of Contact</label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              {...register("preferredContact")}
              type="radio"
              value="Email"
              className="mr-2"
            />
            Email
          </label>
          <label className="flex items-center">
            <input
              {...register("preferredContact")}
              type="radio"
              value="Phone"
              className="mr-2"
            />
            Phone
          </label>
          <label className="flex items-center">
            <input
              {...register("preferredContact")}
              type="radio"
              value="SMS"
              className="mr-2"
            />
            SMS
          </label>
        </div>
        {errors.preferredContact && (
          <p className="text-red-500 mt-1">{errors.preferredContact.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-gray-300">Hobbies and Interests</label>
        <div className="grid grid-cols-2 gap-2">
          {hobbies.map((hobby) => (
            <label key={hobby} className="flex items-center">
              <input
                {...register("hobbies")}
                type="checkbox"
                value={hobby}
                className="mr-2"
              />
              {hobby}
            </label>
          ))}
        </div>
        {errors.hobbies && (
          <p className="text-red-500 mt-1">{errors.hobbies.message}</p>
        )}
      </div>

      <div>
        <label className="flex items-center">
          <input {...register("newsletter")} type="checkbox" className="mr-2" />
          Subscribe to newsletter
        </label>
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
