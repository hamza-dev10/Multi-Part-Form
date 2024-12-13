"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    phoneNumber: yup.string().required("Phone number is required"),
    alternatePhone: yup.string(),
    addressLine1: yup.string().required("Address is required"),
    addressLine2: yup.string(),
    city: yup.string().required("City is required"),
    postalCode: yup.string().required("Postal code is required"),
    country: yup.string().required("Country is required"),
  })
  .required();

const countries = ["USA", "UK", "Canada", "Australia", "India"];
const cities = ["New York", "London", "Toronto", "Sydney", "Delhi"];

export default function StepTwo({ onNext, onPrev, updateFormData, formData }) {
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
          {...register("phoneNumber")}
          placeholder="Phone Number"
          className="w-full p-3 bg-gray-700 rounded-lg"
        />
        {errors.phoneNumber && (
          <p className="text-red-500 mt-1">{errors.phoneNumber.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("alternatePhone")}
          placeholder="Alternate Phone Number (Optional)"
          className="w-full p-3 bg-gray-700 rounded-lg"
        />
      </div>

      <div>
        <input
          {...register("addressLine1")}
          placeholder="Address Line 1"
          className="w-full p-3 bg-gray-700 rounded-lg"
        />
        {errors.addressLine1 && (
          <p className="text-red-500 mt-1">{errors.addressLine1.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("addressLine2")}
          placeholder="Address Line 2 (Optional)"
          className="w-full p-3 bg-gray-700 rounded-lg"
        />
      </div>

      <div>
        <select
          {...register("city")}
          className="w-full p-3 bg-gray-700 rounded-lg"
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        {errors.city && (
          <p className="text-red-500 mt-1">{errors.city.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("postalCode")}
          placeholder="Postal Code"
          className="w-full p-3 bg-gray-700 rounded-lg"
        />
        {errors.postalCode && (
          <p className="text-red-500 mt-1">{errors.postalCode.message}</p>
        )}
      </div>

      <div>
        <select
          {...register("country")}
          className="w-full p-3 bg-gray-700 rounded-lg"
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        {errors.country && (
          <p className="text-red-500 mt-1">{errors.country.message}</p>
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
