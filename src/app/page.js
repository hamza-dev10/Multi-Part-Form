"use client";
import { useState, useEffect } from "react";
import ProgressBar from "@/components/Steps/ProgressBar";
import StepOne from "@/components/Steps/StepOne";
import StepTwo from "@/components/Steps/StepTwo";
import StepThree from "@/components/Steps/StepThree";
import StepFour from "@/components/Steps/StepFour";
import StepFive from "@/components/Steps/StepFive";
import StepSix from "@/components/Steps/StepSix";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedStep = localStorage.getItem("currentStep");
    const savedData = localStorage.getItem("formData");

    if (savedStep) {
      setCurrentStep(parseInt(savedStep));
    }

    if (savedData) {
      setFormData(JSON.parse(savedData));
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("currentStep", currentStep);
    }
  }, [currentStep, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("formData", JSON.stringify(formData));
    }
  }, [formData, isLoading]);

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const resetForm = () => {
    localStorage.removeItem("formData");
    localStorage.removeItem("currentStep");
    setFormData({});
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Create an account</h1>
          <ProgressBar currentStep={currentStep} totalSteps={6} />
        </div>

        {currentStep === 1 && (
          <StepOne
            onNext={handleNext}
            updateFormData={updateFormData}
            formData={formData}
          />
        )}
        {currentStep === 2 && (
          <StepTwo
            onNext={handleNext}
            onPrev={handlePrev}
            updateFormData={updateFormData}
            formData={formData}
          />
        )}
        {currentStep === 3 && (
          <StepThree
            onNext={handleNext}
            onPrev={handlePrev}
            updateFormData={updateFormData}
            formData={formData}
          />
        )}
        {currentStep === 4 && (
          <StepFour
            onNext={handleNext}
            onPrev={handlePrev}
            updateFormData={updateFormData}
            formData={formData}
          />
        )}
        {currentStep === 5 && (
          <StepFive
            onNext={handleNext}
            onPrev={handlePrev}
            updateFormData={updateFormData}
            formData={formData}
          />
        )}
        {currentStep === 6 && (
          <StepSix
            formData={formData}
            onPrev={handlePrev}
            resetForm={resetForm}
          />
        )}
      </div>
    </div>
  );
}
