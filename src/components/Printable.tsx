import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useReactToPrint } from 'react-to-print'

export interface IPrintableProps {
  dialogOpen: boolean
  closeCallback: () => any
  children: React.ReactNode
}

export default function Printable(props: IPrintableProps) {
  const [printableCardGridRef, setPrintableCardGridRef] = useState(null)
  const openPrintCardGridDialog = useReactToPrint({
    content: () => printableCardGridRef,
    documentTitle: 'ASTRO Numbers',
    onAfterPrint: props.closeCallback,
  })

  useEffect(() => {
    if (props.dialogOpen && printableCardGridRef) {
      openPrintCardGridDialog()
    }
  }, [props.dialogOpen, printableCardGridRef])

  return props.dialogOpen ? (
    <Box ref={setPrintableCardGridRef} position="absolute" zIndex={-1}>
      {props.children}
    </Box>
  ) : null
}
