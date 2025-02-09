"use client"

import { Sliders } from "lucide-react";
import Navbar from "./Navbar";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Slider from "@mui/material/Slider";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import getSheetMusic from "@/musicModel/basicpitch";


export default function AddSong() {
    interface Song {
        //username: String,
        title: String,
        instrument: String,
        file: any,
    }
    const [title, setTitle] = useState("");
    const [instrument, setInstrument] = useState("");
    const [file, setFile] = useState(null);
    
    const [difficulty, setDifficulty] = useState<number>(0);
    const [onsetThresh, setOnsetThresh] = useState<number>(0);
    const [offsetThresh, setOffsetThresh] = useState<number>(0);
    const [minNoteLength, setMinNoteLength] = useState<number>(0);

    const [pdfFile, setPdfFile] = useState<File | null>(null);

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const handleTitleChange = (event: any) => {
        setTitle(event.target.value);
    }
    const handleInstrumentChange = (event: any) => {
        setInstrument(event.target.value);
    }
    const handleFileChange = (file: any) => {
        setFile(file);
    };

    const handleDifficultyChange = (value: number) => {
        setDifficulty(value);
    }

    const handleOnsetThreshChange = (value: number) => {
        switch (value) {
            case 1:
                value = 2;
                break;
            case 2:
                value = 1.5;
                break;
            case 3:
                value = 1;
                break;
            case 4:
                value = 0.8;
                break;
            case 5:
                value = 0.7;
                break;
            case 6:
                value = 0.5;
                break;
        }
        setOnsetThresh(value);
    }

    const handleOffsetThreshChange = (value: number) => {
        switch (value) {
            case 1:
                value = 0.8;
                break;
            case 2:
                value = 0.8;
                break;
            case 3:
                value = 0.5;
                break;
            case 4:
                value = 0.3;
                break;
            case 5:
                value = 0.1;
                break;
            case 6:
                value = 0.1;
                break;
        }
        setOffsetThresh(value);
    }

    const handleMinNoteLengthChange = (value: number) => {
        switch (value) {
            case 1:
                value = 5;
                break;
            case 2:
                value = 5;
                break;
            case 3:
                value = 5;
                break;
            case 4:
                value = 5;
                break;
            case 5:
                value = 3;
                break;
            case 6:
                value = 3;
                break;
        }
        setMinNoteLength(value);
    }
    

    const handlePreUpload = (event: any) => {
        event.preventDefault(); 
        if (difficulty === 0 || title === "" || instrument === "" || !file) {
            window.alert('Please fill out all fields');
            return;
        }
        if (file) {
            getSheetMusic(file, difficulty, onsetThresh, offsetThresh, minNoteLength)
                .then((pdf) => {
                    setPdfFile(pdf);
                })
                .catch((error) => {
                    console.error("Error generating sheet music:", error);
                });
            setOpen(true);
        } else {
            console.error("No file selected");
        }
        setOpen(true);
    }

    const handleUpload = async (event: any) => {
        event.preventDefault();
        const dbFile = await convertPdfToBase64(pdfFile as File);

        const song: Song = {
            title: title,
            instrument: instrument,
            file: dbFile,
        }
        console.log(song);
        const token = localStorage.getItem('token');
        if (!token) {
            window.alert('You must be logged in to upload a song');
            return;
        }
        try {
            const response = await fetch('http://localhost:2000/addSong', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: title,
                    instrument: instrument,
                    file: dbFile
                }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data);
                window.alert('Added song successfully!');
            }
        } catch (err) {
            console.error(err);
        }
    }


    return (
        <div>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen w-full">
                <div className="bg-[#3E3A47] shadow-lg rounded-lg p-8 max-w-md w-full mx-4 sm:mx-auto">
                    <h1 className="text-2xl text-center mb-6">Add Song</h1>
                    <form className="space-y-6">
                        <input
                            onChange={handleTitleChange}
                            type="text"
                            placeholder="Title"
                            className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            onChange={handleInstrumentChange}
                            type="text"
                            placeholder="Instrument"
                            className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <FileUploader
                            handleChange={handleFileChange}
                            name="file"
                            fileTypes={["mp3", "wav", "flac"]}
                            dropMessageStyle={{ color: "black" }}
                            label="Drag and drop your audio file here or click to browse"
                            multiple={false}
                            uploadedLabel="Uploaded"
                        />
                        <div className="w-full">
                            <label htmlFor="difficulty" className="block text-center mb-2">Difficulty</label>
                            <Slider
                                defaultValue={3}
                                step={1}
                                marks
                                min={1}
                                max={6}
                                valueLabelDisplay="auto"
                                onChange={(event, value) => handleDifficultyChange(Array.isArray(value) ? value[0] : value)}
                            />
                            <p className="text-center mt-2 text-sm text-white-600">
                                Indicate the difficulty level of the song. 1 is the easiest and 6 is the hardest.
                            </p>
                        </div>
                        <button
                            onClick={handlePreUpload}
                            type="submit"
                            className="w-full bg-blue-500 text-white p-3 rounded-lg transition duration-150 hover:bg-blue-600"
                        >
                            Upload
                        </button>
                        <Modal open={open} onClose={handleClose}>
                            <Box sx={{
                                position: 'relative',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '90%',
                                height: '90%',
                                bgcolor: '#3E3A47',
                                boxShadow: 24,
                                p: 4,
                                borderRadius: '8px',
                                color: 'white',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <h2 className="text-2xl mb-4 text-center">Modify Score</h2>
                                <div className="flex flex-grow">
                                    <div className="w-1/2 pr-4 flex flex-col">
                                        <div className="mt-2 pr-4 flex flex-col space-y-4"> 
                                            <div className="mb-4">
                                                <p className="text-sm text-white mb-2">Mininum Onset</p>
                                                <Slider
                                                    defaultValue={3}
                                                    step={1}
                                                    marks
                                                    min={1}
                                                    max={6}
                                                    valueLabelDisplay="auto"
                                                    onChange={(event, value) => handleOnsetThreshChange(Array.isArray(value) ? value[0] : value)}
                                                    sx={{ mx: 1 }}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <p className="text-sm text-white mb-2">Maximum Offset</p>
                                                <Slider
                                                    defaultValue={3}
                                                    step={1}
                                                    marks
                                                    min={1}
                                                    max={6}
                                                    valueLabelDisplay="auto"
                                                    onChange={(event, value) => handleOffsetThreshChange(Array.isArray(value) ? value[0] : value)}
                                                    sx={{ mx: 1 }}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <p className="text-sm text-white mb-2">Minimum Note Length</p>
                                                <Slider
                                                    defaultValue={3}
                                                    step={1}
                                                    marks
                                                    min={1}
                                                    max={6}
                                                    valueLabelDisplay="auto"
                                                    onChange={(event, value) => handleMinNoteLengthChange(Array.isArray(value) ? value[0] : value)}
                                                    sx={{ mx: 1 }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-1/2">
                                        {pdfFile && (
                                            <embed
                                                src={URL.createObjectURL(pdfFile)}
                                                type="application/pdf"
                                                width="100%"
                                                height="100%"
                                            />
                                        )}
                                    </div>
                                </div>
                                <p className="text-center mt-4">
                                    Use the sliders to adjust the difficulty of the song.
                                </p>
                                <div className="flex justify-between mt-4">
                                    <button onClick={handlePreUpload} className="w-1/2 bg-gray-500 text-white p-3 rounded-lg transition duration-150 hover:bg-gray-600 mr-2">
                                        Modify
                                    </button>
                                    <button onClick={handleUpload} className="w-1/2 bg-blue-500 text-white p-3 rounded-lg transition duration-150 hover:bg-blue-600 ml-2">
                                        Upload
                                    </button>
                                </div>
                            </Box>
                        </Modal>
                    </form>
                </div>
            </div>
        </div >
    )
}
function convertPdfToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
}