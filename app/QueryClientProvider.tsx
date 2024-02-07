"use client";
import React, { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider as QCP } from "@tanstack/react-query";

const queryClient = new QueryClient();

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return <QCP client={queryClient}>{children}</QCP>;
};

export default QueryClientProvider;
