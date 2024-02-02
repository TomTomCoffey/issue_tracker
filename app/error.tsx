"use client";
import React from "react";

interface Props {
    error: Error;
    reset: () => void;
}

const ErrorPage = ({error, reset}: Props) => {
  return <div>An Error has occured</div>;
};

export default ErrorPage;