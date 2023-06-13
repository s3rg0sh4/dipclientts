import { Alert, Spinner, Table } from "react-bootstrap";
import { HiringStage } from "../enums";
import { useAppSelector } from "../hooks/redux";
import FileInput from "./FileInput";
import { api } from "../service/api";
import { useEffect, useState } from "react";

export const StatusPage = () => {
    const stage = useAppSelector(state => state.hiringStatus);
    const revisionCheck = api.useRevisionCheckQuery();
    const applicationStatusQuery = api.useApplicationStatusQuery();

    const [revision, setRevision] = useState<string | null>(null)
    const [applicationStatus, setApplicationStatus] = useState<string | null>(null);
    const [orderStatus, setOrderStatus] = useState<string | null>(null);

    useEffect(() => {
        if (revisionCheck.data) {
            setRevision(revisionCheck.data);
        }
    }, [revisionCheck]);

    useEffect(() => {
        console.log(applicationStatusQuery)

        if (applicationStatusQuery.data) {
            setApplicationStatus(applicationStatusQuery.data);
        }
    }, [applicationStatusQuery])

    //let status = "0"; //гет запрос статуса

    const spinner = () => (
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Загрузка...</span>
        </Spinner>
    )

    const stageLabel = () => {
        switch (stage) {
            case HiringStage.Start:
                return "Заполнение заявления"
            case HiringStage.CreatingNaturalPerson:
                return "Подтверждение данных физического лица";
            case HiringStage.HiringApplication:
                return "Согласование заявления о приеме на работу";
            case HiringStage.HiringOrder:
                return "Согласование приказа о приеме на работу";
        }
    }

    const stageStatus = (status: string) => {
        switch (status) {
            case "0":
                return "Рассматривается";
            case "1":
                return "Подписано";
        }
    }

    return (
        <div className="mt-5">
            <Table bordered>
                <thead>
                    <tr>
                        <th>Этап обработки</th>
                        <th>Статус обработки</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Подтверждение данных физического лица</td>
                        <td>
                            {stage > HiringStage.CreatingNaturalPerson ?
                                <Alert className="mb-0" variant="success">
                                    Согласовано
                                </Alert>
                                : revisionCheck.isLoading || revisionCheck.isError
                                    ? spinner()
                                    : revision == null
                                        ? <Alert className="mb-0" variant="info">
                                            Рассматривается
                                        </Alert>
                                        : <Alert className="mb-0" variant="danger">
                                            {revision}
                                        </Alert>
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>Согласование заявления о приеме на работу</td>
                        <td>{stage < HiringStage.HiringApplication || !applicationStatus
                            ? spinner()
                            : <Alert className="mb-0" variant={applicationStatus === "Согласовано" ? "success" : "info"}>
                                {applicationStatus}
                            </Alert>
                        }
                        </td>
                    </tr>
                    <tr>
                        <td>Согласование приказа о приеме на работу</td>
                        <td>
                            {stage < HiringStage.Applied
                                ? spinner()
                                : <Alert className="mb-0" variant={"success"}>
                                    Согласовано
                                </Alert>
                            }
                        </td>
                    </tr>
                </tbody>
            </Table>
            {stage === HiringStage.Applied
                ? <Alert variant="success">Заявление на прием согласовано, необходимо явиться в отдел кадров для подписания трудового договора и предоставления оригиналов документов необходимых для приема на работу. Датой приема на работу будет считаться дата подписания Вами трудового договора</Alert>
                : <FileInput />
            }
            



        </div>
    );
}