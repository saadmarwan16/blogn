import { useRouter } from "next/router"

const useShowNavbar = () => {
    const router = useRouter();

    return router.pathname !== "/auth/login" && router.pathname !== "/auth/signup";
}

export default useShowNavbar;