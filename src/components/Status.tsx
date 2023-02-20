import {api} from "../service/api";

export const Status = () => {
    const {data, error, isLoading} = api.useGetStatusQuery();


    return (
        <div>


        </div>
    );
}