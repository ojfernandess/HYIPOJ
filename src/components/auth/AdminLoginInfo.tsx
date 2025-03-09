import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

const AdminLoginInfo = () => {
  return (
    <Alert className="bg-blue-50 border-blue-200 mb-4">
      <InfoIcon className="h-4 w-4 text-blue-600" />
      <AlertTitle>Admin Access</AlertTitle>
      <AlertDescription className="text-blue-700">
        <p>Use the following credentials to access the admin panel:</p>
        <p className="mt-2">
          <strong>Username:</strong> admin
          <br />
          <strong>Password:</strong> Soberano200
        </p>
        <p className="mt-1 text-xs">
          (You can also use ojfernandes/Soberano200)
        </p>
      </AlertDescription>
    </Alert>
  );
};

export default AdminLoginInfo;
