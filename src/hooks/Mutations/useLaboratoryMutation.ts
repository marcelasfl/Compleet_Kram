import { MutationOptionsType, MutationResultType, MutationTypeVariables } from "@/@types/react-query.types";
import { defaultApiActionFn } from "@/utils/axios";
import { setPaginationQueryData } from "@/utils/react-query.utils";
import { Laboratory } from "@/validations/laboratory.validations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_LABORATORY_URL, LABORATORYS_QUERY_KEY, useLaboratorysQuery, useLaboratorysResult } from "../Querys/useLaboratoryQuery";

export default function useLaboratoryMutation(
    options?:MutationOptionsType<Laboratory>
): MutationResultType<Laboratory>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:({ id, data, del}) =>
        defaultApiActionFn<Laboratory>({
            url:API_LABORATORY_URL,
            id,
            del,
            data,

        }),
        onSuccess(data, variables){
            queryClient.setQueryData(
                [LABORATORYS_QUERY_KEY, undefined],
                (prev: useLaboratorysResult)=>{
                    return setPaginationQueryData<
                        Laboratory,
                        useLaboratorysResult,
                        MutationTypeVariables<Laboratory>
                    >(data, prev,variables)
                }
            )
        },
        ...options,
    })

}
 