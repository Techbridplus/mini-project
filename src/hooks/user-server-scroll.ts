import { useEffect,useState } from "react";

type ServerScrollProps = {
    serverRef: React.RefObject<HTMLDivElement | null>;
    bottomRef: React.RefObject<HTMLDivElement | null>;
    shouldLoadMore: boolean;
    loadMore: () => void;
    count: number;
};

export const useServerScroll = ({
    serverRef,
    bottomRef,
    shouldLoadMore,
    loadMore,
    count
}: ServerScrollProps) => {
    const [hasInitialized, setHasInitialized] = useState(false);

    useEffect(() => {
        const topDiv = serverRef?.current;

        const handleScroll = () => {
            const scrollTop = topDiv?.scrollTop;
            const scrollHeight = topDiv?.scrollHeight;
            const clientHeight = topDiv?.clientHeight;
            if (scrollTop !== undefined && clientHeight !== undefined && scrollHeight !== undefined && scrollTop + clientHeight >= scrollHeight - 100 && shouldLoadMore) {
                loadMore();
              }
        };

        topDiv?.addEventListener("scroll", handleScroll);

        return () => topDiv?.removeEventListener("scroll", handleScroll);
    }, [shouldLoadMore, loadMore, serverRef]);
}