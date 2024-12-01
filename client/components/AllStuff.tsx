import React from "react"
import { useAllStuff } from "../hooks/useStuff"
import { useNavigate} from 'react-router-dom'

export function AllStuff () {

    const { isPending, isError, data } = useAllStuff()

    const navigate = useNavigate()

    if (isPending) return <div>Loading...</div>
    if (isError) return <div>Error loading stuff</div>

    return (

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px' }}>
            {data.map((stuff) => (
              <div
                onClick={()=>{navigate(`/stuff/${stuff.id}`)}}
                key={stuff.id}
                style={{
                  backgroundColor: 'white',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px',
                  padding: '16px',
                  transition: 'box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 6px 10px rgba(0, 0, 0, 0.15)')}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)')}
              >
                <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#2D3748', marginBottom: '8px' }}>
                  {stuff.name}
                </h1>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '14px',
                    color: '#718096',
                    marginBottom: '16px',
                  }}
                >
                  <p>
                    <span style={{ fontWeight: '500', color: '#2D3748' }}>Price:</span> ${stuff.price}
                  </p>
                  <p>
                    <span style={{ fontWeight: '500', color: '#2D3748' }}>Bond:</span> ${stuff.bond}
                  </p>
                  <p>
                    <span style={{ fontWeight: '500', color: '#2D3748' }}>Condition:</span> {stuff.condition}
                  </p>
                </div>
                <p style={{ color: '#4A5568' }}>{stuff.description}</p>
              </div>
            ))}
        </div>

    )
}