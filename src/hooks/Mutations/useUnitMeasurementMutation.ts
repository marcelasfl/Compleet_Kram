import { MutationOptionsType, MutationResultType, MutationTypeVariables } from "@/@types/react-query.types";
import { defaultApiActionFn } from "@/utils/axios";
import { setPaginationQueryData } from "@/utils/react-query.utils";
import { UnitMeasure } from "@/validations/unit-measure.validations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_UNIT_MEASURE_URL, UNIT_MEASURES_QUERY_KEY, useUnitMeasuresResult } from "../Querys/useUnitMeasureQuery";

export default function useUnitMeasurementMutation(
    options?:MutationOptionsType<UnitMeasure>
): MutationResultType<UnitMeasure>{
    const queryCliente = useQueryClient();
    return useMutation({
        mutationFn:({ id, data, del}) =>
        defaultApiActionFn<UnitMeasure>({
            url:API_UNIT_MEASURE_URL,
            id,
            del,
            data,

        }),
        onSuccess(data, variables){
            queryCliente.setQueryData(
                [UNIT_MEASURES_QUERY_KEY, undefined],
                (prev: useUnitMeasuresResult)=>{
                    return setPaginationQueryData<
                        UnitMeasure,
                        useUnitMeasuresResult,
                        MutationTypeVariables<UnitMeasure>
                    >(data, prev,variables)
                }
            )
        },
        ...options,
    })

}