import { RootState } from "@/lib/store";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const WithAuth = (WrappedComponent: React.ComponentType, allowedRoles: string[]) => {
  const ComponentWithAuth = (props: any) => {
    const router = useRouter();
    const user = useSelector((state: RootState) => state.user.user);

    if (typeof window !== "undefined") {
      if (!user) {
        router.replace("/login");
        return null;
      }

      if (user && !allowedRoles.includes(user.role)) {
        router.replace("/unauthorized");
        return null;
      }
    }

    return <WrappedComponent {...props} />;
  };

  ComponentWithAuth.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return ComponentWithAuth;
};

export default WithAuth;
