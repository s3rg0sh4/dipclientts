import { Alert, Table } from "react-bootstrap";
import { HiringStage } from "../enums";
import { useAppSelector } from "../hooks/redux";
import FileInput from "./FileInput";

export const StatusPage = () => {
    const stage = useAppSelector(state => state.hiringStatus);
    let status = "0"; //гет запрос статуса

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

    const stageStatus = () => {
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
                        <td>{stageLabel()}</td>
                        <td><Alert className="mb-0">{stageStatus()}</Alert></td>
                    </tr>
                </tbody>
            </Table>
            <FileInput/>



        </div>
    );
}