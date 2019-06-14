import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemIcon from '@material-ui/core/ListItemIcon'

import IconButton from '@material-ui/core/IconButton'
import RemoveIcon from '@material-ui/icons/RemoveCircle'
import PDFIcon from '@material-ui/icons/PictureAsPdf'
import FileIcon from '@material-ui/icons/InsertDriveFile'

import { filterById, humanizeBytes, clipName } from './utils'

// TODO: preview for non images (icon)
const FilePreview = ({ type, parsed }) => {
  const [prefix] = type.split('/')

  return prefix === 'image' ? (
    <ListItemAvatar>
      <Avatar style={{ borderRadius: 0 }} alt="Preview" src={parsed} />
    </ListItemAvatar>
  ) : (
    <ListItemIcon>
      {type === 'application/pdf' ? <PDFIcon /> : <FileIcon />}
    </ListItemIcon>
  )
}

const FileItem = ({ file, onClick }) => (
  <ListItem alignItems="center">
    <FilePreview {...file} />
    <ListItemText
      primary={clipName(file.name)}
      secondary={humanizeBytes(file.size)}
    />
    <ListItemSecondaryAction>
      <IconButton edge="end" aria-label="Remove" onClick={onClick}>
        <RemoveIcon color="secondary" />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
)

const FilesList = ({ files, setFiles }) => {
  const filterFile = id => filterById(files, id)
  const remove = id => () => setFiles(filterFile(id))
  return files.length ? (
    <React.Fragment>
      <Divider />
      <List>
        {files.map((file, index) => (
          <FileItem key={index} file={file} onClick={remove(file.id)} />
        ))}
      </List>
    </React.Fragment>
  ) : null
}

export default FilesList
