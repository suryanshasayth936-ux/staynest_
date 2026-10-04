import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api, { getErrorMessage } from '../../api/client.js';
import { STAY_TYPES } from '../../utils/format.js';

const empty = {
  title: '',
  description: '',
  type: 'homestay',
  city: '',
  state: '',
  address: '',
  pricePerNight: '',
  maxGuests: 2,
  bedrooms: 1,
  amenities: '',
  imageUrl: '',
};

export default function ListingForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEdit) return;
    api.get(`/listings/${id}`).then(({ data }) =>
      setForm({
        ...empty,
        ...data,
        amenities: data.amenities.join(', '),
        imageUrl: data.images[0] || '',
      })
    );
  }, [id, isEdit]);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  // TODO: replace the image URL field with real image upload (Cloudinary / multer).
  const submit = async (e) => {
    e.preventDefault();
    setError('');
    const { title, description, type, city, state, address, imageUrl, amenities } = form;
    const payload = {
      title: title.trim(),
      description: description.trim(),
      type,
      city: city.trim(),
      state: state.trim(),
      address: address.trim(),
      pricePerNight: Number(form.pricePerNight),
      maxGuests: Number(form.maxGuests),
      bedrooms: Number(form.bedrooms),
      amenities: amenities.split(',').map((a) => a.trim()).filter(Boolean),
    };
    if (imageUrl) payload.images = [imageUrl.trim()];
    try {
      if (isEdit) await api.put(`/listings/${id}`, payload);
      else await api.post('/listings', payload);
      navigate('/host');
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <form className="card form wide" onSubmit={submit}>
      <h1>{isEdit ? 'Edit listing' : 'Create a new listing'}</h1>
      <input
        type="text"
        required
        maxLength={100}
        placeholder="Title"
        value={form.title}
        onChange={set('title')}
      />
      <textarea
        required
        placeholder="Describe your place"
        value={form.description}
        onChange={set('description')}
      />
      <div className="row">
        <select required value={form.type} onChange={set('type')}>
          {STAY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <input
          required
          type="number"
          min="0"
          step="1"
          placeholder="Price per night (₹)"
          value={form.pricePerNight}
          onChange={set('pricePerNight')}
        />
      </div>
      <div className="row">
        <input
          type="text"
          required
          maxLength={60}
          placeholder="City"
          value={form.city}
          onChange={set('city')}
        />
        <input
          type="text"
          required
          maxLength={60}
          placeholder="State"
          value={form.state}
          onChange={set('state')}
        />
      </div>
      <input
        type="text"
        required
        maxLength={200}
        placeholder="Address"
        value={form.address}
        onChange={set('address')}
      />
      <div className="row">
        <label className="grow">Max guests
          <input
            required
            type="number"
            min="1"
            max="100"
            value={form.maxGuests}
            onChange={set('maxGuests')}
          />
        </label>
        <label className="grow">Bedrooms
          <input
            required
            type="number"
            min="0"
            max="50"
            value={form.bedrooms}
            onChange={set('bedrooms')}
          />
        </label>
      </div>
      <input
        type="text"
        placeholder="Amenities (comma separated: WiFi, AC, Parking)"
        value={form.amenities}
        onChange={set('amenities')}
      />
      <input
        type="url"
        placeholder="Image URL (optional)"
        value={form.imageUrl}
        onChange={set('imageUrl')}
      />
      {error && <p className="error">{error}</p>}
      <button className="btn">{isEdit ? 'Save changes' : 'Publish listing'}</button>
    </form>
  );
}
