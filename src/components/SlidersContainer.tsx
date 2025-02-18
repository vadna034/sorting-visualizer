import { Box, Slider, Typography } from '@mui/material';
import { DEFAULT_ANIMATION_SPEED } from 'App';
import React from 'react';

export interface SlidersContainerProps {
    changeNumberOfElements: (event: React.SyntheticEvent | Event, value: number | number[]) => void;
    changeAnmiationSpeed: (event: React.SyntheticEvent | Event, value: number | number[]) => void;
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
                    step={10}
                    min={10}
                    max={200}
                    valueLabelDisplay="auto"
                    onChangeCommitted={props.changeNumberOfElements}
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
                    defaultValue={DEFAULT_ANIMATION_SPEED}
                    step={1}
                    min={0}
                    max={100}
                    valueLabelDisplay="auto"
                    onChangeCommitted={props.changeAnmiationSpeed}
                    />
                </Box>
            </div>
        </div>

    </>
}