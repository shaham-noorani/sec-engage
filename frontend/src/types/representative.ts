interface Representative extends Document {
  company?: string;
  fullname: string;
  email: string;
  position: string;
  phone: string;
  linkedin?: string;
  interactions?: string[] | null;
}

export default Representative;
