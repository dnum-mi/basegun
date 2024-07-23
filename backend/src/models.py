from pydantic import BaseModel


class EmailData(BaseModel):
    firstname: str
    lastname: str
    nigend: str
    service: str | None
    phone: str
    email: str
    seizure: str
    una_or_procedure_number: str
    gun_type: str
    gun_length: int | None
    gun_barrel_length: int | None
    markings_description: str | None
    right_picture: str
    left_picture: str
    markings_pictures: str
    magazine_picture: str | None
