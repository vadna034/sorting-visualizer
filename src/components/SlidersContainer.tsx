import { Box, Slider, Typography } from '@mui/material';
import React from 'react';

export interface SlidersContainerProps {
    addElement: () => void;
    removeElement: () => void;
}

export function SlidersContainer(props: SlidersContainerProps) {
    return <>
        <div style={{display: "flex", flexDirection: "row"}}>
            <div style={{width: "50%", margin: "0 3em"}}>
                <Box sx={{ width: "250" }}>
                    <Typography id="track-false-slider" gutterBottom>
                        Number of Elements
                    </Typography>
                    <Slider
                    aria-label="Small steps"
                    defaultValue={10}
                    step={5}
                    min={5}
                    max={100}
                    valueLabelDisplay="auto"
                    />
                </Box>
            </div>
            <div style={{width: "50%", margin: "0 3em"}}>
                <Box>
                    <Typography id="track-false-slider" gutterBottom>
                        Animation Speed
                    </Typography>
                    <Slider
                    aria-label="Small steps"
                    defaultValue={10}
                    step={5}
                    min={5}
                    max={100}
                    valueLabelDisplay="auto"
                    />
                </Box>
            </div>
        </div>

    </>
}