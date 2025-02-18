import { PauseCircle, PlayArrow } from '@mui/icons-material';
import { IconButton, } from '@mui/material';
import React from 'react';

export interface PlayPauseContainerProps {
    setShouldPause: (val:boolean) => void;
}

export function PlayPauseContainer(props: PlayPauseContainerProps) {
    return  <>
    <div style={{flexDirection: "row"}}>
        <div style={{display: "flex", alignSelf: "center", justifyContent: "center"}}>
            <IconButton
            onClick={() => props.setShouldPause(false)}
            >
                <PlayArrow></PlayArrow>
            </IconButton>
            <IconButton
                onClick={() => props.setShouldPause(true)}
            >
                <PauseCircle></PauseCircle>
            </IconButton>
        </div>
    </div>
  </>
}