type styleObj = { [key: string]: React.CSSProperties | styleObj }

const Styles: styleObj = {
  dropzone: {
    border: '1px dashed #ddd',
    borderRadius: '4px',
    padding: '15px',
    cursor: 'pointer',
    transition: 'height 0.2s ease',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pictureWrapper: {
    position: 'relative',
    color: 'white',
  },
  pictureInput: {
    maxWidth: '100%',
    position: 'absolute',
    opacity: 0,
  },
  pictureImg: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },
  pictureGradient: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  pictureIcon: { position: 'absolute', bottom: 10, right: 10 },
}

export default Styles
