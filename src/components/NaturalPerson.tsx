import React, {FC, useState} from "react";
import {api} from "../service/api";
import {INaturalPerson, initNaturalPerson, naturalPersonPlaceholder} from "../models";
import {Button, Container, FormControl, Input, Stack} from "@mui/material";
import InputLabel from "@mui/material/InputLabel/InputLabel";

export const NaturalPerson: FC = () => {

    const [postPerson, result] = api.usePostPersonMutation();
    const [person, setPerson] = useState<INaturalPerson>(initNaturalPerson);
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value}: { name: string, value: string } = e.target;
        setPerson({...person, [name]: value})
    }


    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        setSelectedFiles(files);
    };

    const handleCreate = async () => {
        //setIsSubmitting(true);//если ошибка, кнопку разбанить, мб спиннер докинуть
        //await postPerson({naturalPerson: person, files: selectedFiles!});

        const formData = new FormData();
        formData.append('userEmail', JSON.stringify(localStorage.getItem("email")));
        formData.append('naturalPerson', JSON.stringify(person));
        (Array.from(selectedFiles!) as File[]).forEach(file => {
            formData.append('files', file);
        })
        //userEmail: {email: localStorage.getItem("email")},
        //naturalPerson: data.naturalPerson,

        await postPerson(formData)
    }


    return (
        <form>
            <Stack spacing={1}>
                {Object.keys(person).map((key) => (
                    <FormControl variant="standard">
                        <InputLabel>{naturalPersonPlaceholder[key]}</InputLabel>
                        <Input 
                            type="text" 
                            onChange={handleChange}
                            key={key} 
                            name={key} 
                            // placeholder={naturalPersonPlaceholder[key]}
                        />
                    </FormControl>
                ))}
                <InputLabel>
                        
                    <Input 
                        type="file" 
                        inputProps={{multiple: true}} 
                        onChange={handleFileSelect}
                        sx={{display: 'none'}}
                    />
                    <Button fullWidth component='span'>
                        Выбрать файлы
                    </Button>
                </InputLabel>
                
                <Button 
                    onClick={handleCreate} 
                    disabled={isSubmitting} 
                    variant="contained"
                >
                    Сохранить
                </Button>
            </Stack>
        </form>
    );
};