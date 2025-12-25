-- Create RSVP table to store guest responses
CREATE TABLE public.rsvp (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  attendance TEXT NOT NULL CHECK (attendance IN ('hadir', 'tidak')),
  guests INTEGER DEFAULT 1,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.rsvp ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert RSVP (public form)
CREATE POLICY "Anyone can submit RSVP" 
ON public.rsvp 
FOR INSERT 
WITH CHECK (true);

-- Allow anyone to read RSVP messages (for displaying wishes)
CREATE POLICY "Anyone can view RSVP messages" 
ON public.rsvp 
FOR SELECT 
USING (true);

-- Enable realtime for RSVP table
ALTER PUBLICATION supabase_realtime ADD TABLE public.rsvp;