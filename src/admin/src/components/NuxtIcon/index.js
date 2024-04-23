// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useIntl } from "react-intl";
import * as HeroIconsSolid from '@heroicons/react/24/solid'; // Import all Heroicons
import * as HeroIconsOutline from '@heroicons/react/24/outline';


const NuxtIcon = React.forwardRef((props, ref) => {
    const { attribute, disabled, intlLabel, name, onChange, required, value } = props;
    const { formatMessage } = useIntl();

    const [val, setVal] = useState(value)
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState(1)

    //get field value
    useEffect(() => {
        setVal(value)
    }, [value]);

    //set field value
    useEffect(() => {
        try {
            onChange({
                target: { name, type: attribute.type, value: val },
            });
        } catch (error) {
            console.error("Failed to set Heroicon value:", value);
        }
    }, [val])

    const handleChange = (e) => {
        const iconString = e.currentTarget.value
        setVal(iconString)
    }

    const handleModalToggle = () => {
        setShowModal(!showModal);
    };

    const handleHeroiconSelect = (name) => {
        setVal(name);
        setShowModal(false);
    };

    const heroiconComponentsSolid = Object.keys(HeroIconsSolid).map((key) => {
        const iconName = key.replace('Icon', '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
        return [HeroIconsSolid[key], `i-heroicons-${iconName}-solid`];
    });
    const heroiconComponentsOutline = Object.keys(HeroIconsOutline).map((key) => {
        const iconName = key.replace('Icon', '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
        return [HeroIconsOutline[key], `i-heroicons-${iconName}-outline`];
    });

    return (
        <div style={{ gap: "4px" }}>
            <span style={{
                fontSize: "0.75rem",
                lineHeight: "1.33",
                fontWeight: "600",
                color: "white"
            }}>{formatMessage(intlLabel)}</span>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                    style={{
                        fontWeight: "400",
                        fontSize: " 0.875rem",
                        display: "block",
                        border: "1px solid rgb(74, 74, 106)",
                        borderRadius: "4px",
                        width: "100%",
                        background: "rgb(33, 33, 52)",
                        color: "white",
                        padding: "0.65625rem 16px",
                        marginRight: '8px',
                        flex: '1'
                    }}
                    type='text'
                    onChange={handleChange}
                    value={value} />
                <span style={{ color: "white", marginRight: "8px" }}>OR</span>
                <button style={{
                    fontWeight: "400",
                    fontSize: "0.875rem",
                    border: "1px solid rgb(74, 74, 106)",
                    borderRadius: "4px",
                    background: "rgb(33, 33, 52)",
                    color: "white",
                    padding: "0.65625rem 16px",
                    cursor: "pointer"
                }} onClick={handleModalToggle}>Select Heroicon</button>
            </div>

            {showModal && (
                <div style={{
                    position: "fixed",
                    top: "0",
                    left: "0",
                    right: "0",
                    bottom: "0",
                    background: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: "10"
                }}>
                    <div style={{
                        background: "#fff",
                        padding: "0 20px",
                        borderRadius: "8px",
                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                        width: "600px", // Increase the width of the modal
                        maxHeight: "80vh",
                        overflowY: "auto",
                        position: "relative" // Make the modal position relative
                    }}>
                        <div style={{
                            position: "sticky",
                            top: "0",
                            background: "#fff",
                            zIndex: "1",
                            display: "flex",
                            padding: "20px 0",
                            justifyContent: "center"
                        }}>
                            <button
                                style={{ // Tab button 1
                                    marginRight: "20px",
                                    fontWeight: "400",
                                    fontSize: "0.875rem",
                                    border: "1px solid rgb(74, 74, 106)",
                                    borderRadius: "4px",
                                    background: activeTab === 1 ? "rgb(33, 33, 52)" : "#fff",
                                    color: activeTab === 1 ? "#fff" : "rgb(74, 74, 106)",
                                    padding: "0.65625rem 16px",
                                    cursor: "pointer"
                                }}
                                onClick={() => setActiveTab(1)}>Heroicon Solid</button>
                            <button
                                style={{ // Tab button 2
                                    fontWeight: "400",
                                    fontSize: "0.875rem",
                                    border: "1px solid rgb(74, 74, 106)",
                                    borderRadius: "4px",
                                    background: activeTab === 2 ? "rgb(33, 33, 52)" : "#fff",
                                    color: activeTab === 2 ? "#fff" : "rgb(74, 74, 106)",
                                    padding: "0.65625rem 16px",
                                    cursor: "pointer"
                                }}
                                onClick={() => setActiveTab(2)}>Heroicon Outline</button>
                        </div>

                        {activeTab === 1 && (
                            <div style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(60px, 1fr))",
                                gap: "10px",
                                padding: "20px 0"
                            }}>
                                {/* Your list of icons for Tab 1 */}
                                {heroiconComponentsSolid.map(([IconComponent, key]) => (
                                    <div key={key} onClick={() => handleHeroiconSelect(key)} style={{
                                        cursor: "pointer",
                                        border: "1px solid rgb(74, 74, 106)",
                                        borderRadius: "8px",
                                        padding: "4px",
                                        transition: "background-color 0.3s, box-shadow 0.3s",
                                        boxShadow: "0 0 5px rgba(0, 0, 0, 0)",
                                        '&:hover': {
                                            backgroundColor: "rgba(74, 74, 106, 0.1)",
                                            boxShadow: "0 0 5px rgba(0, 0, 0, 0.5)",
                                        }
                                    }}>
                                        <IconComponent style={{ width: "100%", height: "100%" }} />
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 2 && (
                            <div style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(60px, 1fr))",
                                gap: "10px",
                                padding: "20px 0"
                            }}>
                                {/* Your list of icons for Tab 2 */}
                                {heroiconComponentsOutline.map(([IconComponent, key]) => (
                                    <div key={key} onClick={() => handleHeroiconSelect(key)} style={{
                                        cursor: "pointer",
                                        border: "1px solid rgb(74, 74, 106)",
                                        borderRadius: "8px",
                                        padding: "4px",
                                        transition: "background-color 0.3s, box-shadow 0.3s",
                                        boxShadow: "0 0 5px rgba(0, 0, 0, 0)",
                                        '&:hover': {
                                            backgroundColor: "rgba(74, 74, 106, 0.1)",
                                            boxShadow: "0 0 5px rgba(0, 0, 0, 0.5)",
                                        }
                                    }}>
                                        <IconComponent style={{ width: "100%", height: "100%" }} />
                                    </div>
                                ))}
                            </div>
                        )}

                        <div style={{
                            position: "sticky",
                            bottom: "0",
                            background: "#fff",
                            zIndex: "1",
                            display: "flex",
                            padding: "20px 0",
                            justifyContent: "space-between",
                        }}>
                            <span>More icons <a href='https://icones.js.org/' target='_blank'>here</a></span>
                            <button style={{
                                fontWeight: "400",
                                fontSize: "0.875rem",
                                border: "1px solid rgb(74, 74, 106)",
                                borderRadius: "4px",
                                background: "rgb(33, 33, 52)",
                                color: "white",
                                padding: "0.65625rem 16px",
                                cursor: "pointer"
                            }} onClick={handleModalToggle}>Close</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
});

export default NuxtIcon;