"use client";
import React, { useState } from "react";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import { Button, Flex, Box, TextField } from "@radix-ui/themes";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface CloudinaryResult {
  public_id: string;
  thumbnail_url: string;
}

const SignUpPage = () => {
  const [publicId, setPublicId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  function handleSignUp() {
    fetch("/api/users/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password, publicId }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      toast.success("Congrats! You have signed up routing to login page");
      setTimeout(() => {
        router.push("/api/auth/signin");
      }, 1500);
    });
  }

  return (
    <div className="column max-w-85 border-stone-700 ">
      <Box className="p-5 m-50">
        <h1 className="mb-10 mt-5 justify-center border-l-slate-800">Sign Up</h1>

        <Flex direction="column" gap="5">
          <TextField.Root>
            <TextField.Input
              id="name"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </TextField.Root>

          <TextField.Root>
            <TextField.Input
              id="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </TextField.Root>

          <TextField.Root>
            <TextField.Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </TextField.Root>
        </Flex>

        <Flex direction="column" gap="5" className="mt-5">
          <Button>
            <CldUploadWidget
              uploadPreset="obmhadyp"
              options={{
                sources: [
                  "local",
                  "camera",
                  "facebook",
                  "instagram",
                  "dropbox",
                ],
                maxFiles: 1,
                resourceType: "image",
                multiple: false,
              }}
              onUpload={(result, widget) => {
                if (result.event !== "success") {
                  return;
                }
                const info = result.info as CloudinaryResult;
                console.log(info);

                setPublicId(info.thumbnail_url);
              }}
            >
              {({ open }) => (
                <button className="btn btn-primary" onClick={() => open()}>
                  Upload Profile Picture
                </button>
              )}
            </CldUploadWidget>
          </Button>

          <Button onClick={handleSignUp}>Sign Up</Button>
        </Flex>
      </Box>
      <Toaster />
    </div>
  );
};

export default SignUpPage;
