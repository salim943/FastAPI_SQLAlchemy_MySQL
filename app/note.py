from . import schemas, models
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status, APIRouter, Response
from sqlalchemy.exc import IntegrityError
from .database import get_db

router = APIRouter()

@router.get('/')
def get_notes(db: Session = Depends(get_db), limit: int = 10, page: int = 1, search: str = ''):
    skip = (page - 1) * limit
    notes = db.query(models.Note).filter(
        models.Note.title.contains(search)).limit(limit).offset(skip).all()
    return {'status': 'success', 'results': len(notes), 'notes': notes}

@router.post('/', status_code=status.HTTP_201_CREATED)
def create_note(payload: schemas.NoteBaseSchema, db: Session = Depends(get_db)):
    new_note = models.Note(
        title=payload.title,
        content=payload.content,
        category=payload.category,
        published=payload.published
    )
    db.add(new_note)
    try:
        db.commit()
        db.refresh(new_note)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Note with this title already exists.")

    return {"status": "success", "note": new_note}

@router.patch('/{noteId}')
def update_note(noteId: str, payload: schemas.NotePatchSchema, db: Session = Depends(get_db)):
    note_query = db.query(models.Note).filter(models.Note.id == noteId)
    db_note = note_query.first()
    if not db_note:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'No note with this id: {noteId} found')

    update_data = payload.model_dump(exclude_unset=True)

    if 'title' in update_data:
        existing_title = db.query(models.Note).filter(
            models.Note.title == update_data['title'],
            models.Note.id != noteId  
        ).first()
        if existing_title:
            raise HTTPException(status_code=400, detail="Another note with this title already exists.")

    note_query.update(update_data, synchronize_session=False)
    db.commit()
    db.refresh(db_note)
    return {"status": "success", "note": db_note}

@router.get('/{noteId}')
def get_note(noteId: str, db: Session = Depends(get_db)):
    note = db.query(models.Note).filter(models.Note.id == noteId).first()
    if not note:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"No note with this id: {noteId} found")
    return {"status": "success", "note": note}

@router.delete('/{noteId}')
def delete_note(noteId: str, db: Session = Depends(get_db)):
    note_query = db.query(models.Note).filter(models.Note.id == noteId)
    note = note_query.first()
    if not note:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'No note with this id: {noteId} found')
    note_query.delete(synchronize_session=False)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)