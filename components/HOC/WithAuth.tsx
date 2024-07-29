import { UserRole } from "@/store/UserSlice";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const WithAuth = (WrappedComponent: React.ComponentType, allowedRoles: string[]) => {
  const ComponentWithAuth = (props: any) => {
    const router = useRouter();
    const role = useSelector(UserRole);

    if (typeof window !== "undefined") {
      if (!role) {
        toast.error("User not found");
        router.replace("/login");
        return null;
      }

      if (role && !allowedRoles.includes(role)) {
        // router.replace("/unauthorized");
        return null;
      }
    }

    return <WrappedComponent {...props} />;
  };

  ComponentWithAuth.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return ComponentWithAuth;
};

export default WithAuth;
