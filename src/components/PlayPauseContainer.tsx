import { PauseCircle, PlayArrow } from '@mui/icons-material';
import { IconButton, } from '@mui/material';
import React from 'react';

export interface PlayPauseContainerProps {

}

export function PlayPauseContainer(props: PlayPauseContainerProps) {
    return  <>
    <div style={{flexDirection: "row"}}>
        <div style={{display: "flex", alignSelf: "center", justifyContent: "center"}}>
            <IconButton>
                <PlayArrow></PlayArrow>
            </IconButton>
            <IconButton>
                <PauseCircle></PauseCircle>
            </IconButton>
        </div>
    </div>
  </>
}