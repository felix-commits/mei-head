import { FormControl, FormLabel, Input, Modal, ModalClose, Sheet, Typography } from '@mui/joy'

export const Recap = ({ composer, work, open, setOpen }) =>
  composer &&
  work && (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={() => setOpen(false)}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Sheet
        variant="outlined"
        sx={{
          borderRadius: 'md',
          p: 3,
          boxShadow: 'lg',
        }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Typography component="h2" level="h4" textColor="inherit" fontWeight="lg" mb={1}>
          This is your <code>{'<MeiHead/>'}</code>
        </Typography>
        <FormControl sx={{ paddingY: 2 }}>
          <FormLabel>
            Identifiant du compositeur <b>{composer.label}</b>
          </FormLabel>
          <Input readOnly value={composer.composer.split('#about').shift()}></Input>
        </FormControl>

        <FormControl>
          <FormLabel>
            Identifiant de l'œuvre <b>{work.label}</b>
          </FormLabel>
          <Input readOnly value={work.work.split('#about').shift()}></Input>
        </FormControl>
      </Sheet>
    </Modal>
  )
