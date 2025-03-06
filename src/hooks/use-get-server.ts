"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import qs from "query-string";


interface ServerQueryProps {
    queryKey: string;
    apiUrl: string;
}

export const useGetServer = ({
    queryKey,
    apiUrl,
}:ServerQueryProps) => {

    const fetchServer = async ({pageParam = undefined}) => {
        const url = qs.stringifyUrl(
            {
                url: apiUrl,
                query: {
                    cursor: pageParam,
                    // [paramKey]: paramValue
                }
            },
            {skipNull:true}
        );

        const res = await fetch(url);
        return res.json();
    }
    
    const {data, fetchNextPage, hasNextPage, isFetchingNextPage, status} = useInfiniteQuery({
        queryKey: [queryKey],
        queryFn: fetchServer,
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
        refetchInterval: false,
        initialPageParam: undefined
    });

    return {data, fetchNextPage, hasNextPage, isFetchingNextPage, status};
}

